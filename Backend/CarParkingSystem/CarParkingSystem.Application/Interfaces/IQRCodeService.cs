
using System.Threading.Tasks;

namespace CarParkingSystem.Core.Interfaces
{
    public interface IQRCodeService
    {
        Task<string> GenerateQRCodeBase64(string inputText);
    }
}
