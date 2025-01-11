package com.winterfell.controller;

import com.winterfell.model.NoticeDetails;
import com.winterfell.repository.NoticeDetailsRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@Tag(name = "Notices API", description = "Get Notices")
public class NoticesController {
    private final NoticeDetailsRepository noticeDetailsRepository;

    @RequestMapping(path = "/notices", method = RequestMethod.GET)
    @Operation(method = "GET", description = "fetch all the notices")
    private ResponseEntity<List<NoticeDetails>> getNotices() {
        List<NoticeDetails> notices = noticeDetailsRepository.findActiveNotices();
        return notices != null? ResponseEntity.status(HttpStatus.OK).cacheControl(CacheControl.maxAge(120, TimeUnit.SECONDS)).body(notices) : ResponseEntity.status(HttpStatus.OK).cacheControl(CacheControl.maxAge(120, TimeUnit.SECONDS)).body(Collections.emptyList());
    }
}
