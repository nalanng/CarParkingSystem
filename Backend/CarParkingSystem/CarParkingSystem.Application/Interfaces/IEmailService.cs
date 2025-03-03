using CarParkingSystem.Core.DTOs.Email;
using System.Threading.Tasks;

namespace CarParkingSystem.Core.Interfaces
{
    public interface IEmailService
    {
        Task SendAsync(EmailRequest request);
    }
}
