﻿using System.ComponentModel.DataAnnotations;

namespace CarParkingSystem.Core.DTOs.Account
{
    public class ForgotPasswordRequest
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}
