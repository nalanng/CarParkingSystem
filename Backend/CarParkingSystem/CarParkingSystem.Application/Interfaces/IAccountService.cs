using CarParkingSystem.Core.DTOs.Account;
using CarParkingSystem.Core.Wrappers;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CarParkingSystem.Core.Interfaces
{
    public interface IAccountService
    {
        Task<Response<AuthenticationResponse>> AuthenticateAsync(AuthenticationRequest request, string ipAddress);
        Task<Response<string>> RegisterAsync(RegisterRequest request, string origin);
        Task<Response<string>> SendConfirmEmailAsync(string userId, string origin);
        Task<string> ConfirmEmailAsync(string userId, string code);
        Task ForgotPassword(ForgotPasswordRequest model, string origin);
        Task<Response<string>> ResetPassword(ResetPasswordRequest model);
        Task<Response<string>> UpdatePassword(string email, UpdatePasswordRequest model);
        Task<Response<AccountInfo>> GetCurrentUser(string email);
        Task<Response<string>> SetPhoneNumber(string userId, string phoneNumber);

    }
}
