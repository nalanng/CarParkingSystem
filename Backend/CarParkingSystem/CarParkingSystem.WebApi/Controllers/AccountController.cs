using CarParkingSystem.Core.DTOs.Account;
using CarParkingSystem.Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Threading.Tasks;

namespace CarParkingSystem.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;
        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpPost("authenticate")]
        public async Task<IActionResult> AuthenticateAsync(AuthenticationRequest request)
        {
            return Ok(await _accountService.AuthenticateAsync(request, GenerateIPAddress()));
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterAsync(RegisterRequest request)
        {
            var origin = Request.Headers["origin"];
            return Ok(await _accountService.RegisterAsync(request, origin));
        }

        [HttpGet("current-user")]
        [Authorize]
        public async Task<IActionResult> GetCurrentUser()
        {
            var email = User.FindFirstValue(ClaimTypes.Email);

            return Ok(await _accountService.GetCurrentUser(email));
        }

        [HttpPost("send-confirm-email")]
        [Authorize]
        public async Task<IActionResult> SendConfirmEmailAsync()
        {
            var origin = Request.Headers["origin"];
            var userId = User.FindFirst("uid")?.Value;

            return Ok(await _accountService.SendConfirmEmailAsync(userId, origin));
        }

        [HttpGet("confirm-email")]
        public async Task<IActionResult> ConfirmEmailAsync([FromQuery] string userId, [FromQuery] string code)
        {
            var origin = Request.Headers["origin"];
            return Ok(await _accountService.ConfirmEmailAsync(userId, code));
        }

        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword(ForgotPasswordRequest model)
        {
            var origin = Request.Headers["origin"];

            await _accountService.ForgotPassword(model, origin);
            return Ok();
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword(ResetPasswordRequest model)
        {
            return Ok(await _accountService.ResetPassword(model));
        }

        [HttpPut("update-password")]
        [Authorize]
        public async Task<IActionResult> UpdatePassword(UpdatePasswordRequest model)
        {
            var email = User.FindFirstValue(ClaimTypes.Email);

            return Ok(await _accountService.UpdatePassword(email, model));
        }

        [HttpPost("set-phone-number")]
        [Authorize]
        public async Task<IActionResult> SetPhoneNumber(PhoneNumberRequest request)
        {
            var userId = User.FindFirst("uid")?.Value;

            return Ok(await _accountService.SetPhoneNumber(userId, request.PhoneNumber));
        }

        private string GenerateIPAddress()
        {
            if (Request.Headers.ContainsKey("X-Forwarded-For"))
                return Request.Headers["X-Forwarded-For"];
            else
                return HttpContext.Connection.RemoteIpAddress.MapToIPv4().ToString();
        }

    }
}