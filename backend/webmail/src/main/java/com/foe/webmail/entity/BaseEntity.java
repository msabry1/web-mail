package com.foe.webmail.entity;

import lombok.Data;

@Data
public class BaseEntity {
    private String createAt;
    private String createBy;
    private String updateAt;
    private String updateBy;
}
