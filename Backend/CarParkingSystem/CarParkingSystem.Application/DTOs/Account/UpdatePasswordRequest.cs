using System.ComponentModel.DataAnnotations;

namespace CarParkingSystem.Core.DTOs.Account
{
    public class UpdatePasswordRequest
    {
        [Required]
        public string CurrentPassword { get; set; }

        [Required]
        [MinLength(8)]
        public string Password { get; set; }

        [Required]
        [Compare("Password")]
        public string ConfirmPassword { get; set; }
    }
}
