﻿
namespace CarParkingSystem.Core.DTOs.Account
{
    public class AccountInfo
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public bool EmailConfirmed { get; set; }
        public string PhoneNumber { get; set; }
    }
}
