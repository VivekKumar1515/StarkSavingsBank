package com.winterfell.repository;

import com.winterfell.model.NoticeDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoticeDetailsRepository extends JpaRepository<NoticeDetails, Long> {
    @Query(value = "SELECT * FROM notice_details WHERE CURRENT_DATE BETWEEN notice_beg_dt AND notice_end_dt", nativeQuery = true)
    List<NoticeDetails> findActiveNotices();
}
