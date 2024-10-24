package com.winterfell.controller;

import com.winterfell.model.NoticeDetails;
import com.winterfell.repository.NoticeDetailsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.time.Duration;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.TimeUnit;

@RestController
@RequiredArgsConstructor
public class NoticesController {
    private final NoticeDetailsRepository noticeDetailsRepository;

    @RequestMapping(path = "/notices", method = RequestMethod.GET)
    private ResponseEntity<List<NoticeDetails>> getNotices() {
        List<NoticeDetails> notices = noticeDetailsRepository.findActiveNotices();
        return notices != null? ResponseEntity.status(HttpStatus.OK).cacheControl(CacheControl.maxAge(120, TimeUnit.SECONDS)).body(notices) : ResponseEntity.status(HttpStatus.OK).cacheControl(CacheControl.maxAge(120, TimeUnit.SECONDS)).body(Collections.emptyList());
    }
}
