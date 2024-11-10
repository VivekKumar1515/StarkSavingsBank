package com.winterfell.model;


public record AccountDetailsRequestDTO(int initialDeposit, String branchAddress, String accountType) {
}
