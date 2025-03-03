
using CarParkingSystem.Core.Interfaces;
using QRCoder;
using System.IO;
using System.Threading.Tasks;
using System;

namespace CarParkingSystem.Infrastructure.Services
{
    public class QRCodeService: IQRCodeService
    {
        public async Task<string> GenerateQRCodeBase64(string inputText)
        {
            try
            {
                using (MemoryStream memoryStream = new())
                {
                    QRCodeGenerator qrGenerator = new();

                    if (Uri.TryCreate(Uri.UnescapeDataString(inputText), UriKind.Absolute, out Uri? result))
                    {
                        inputText = result.AbsoluteUri;
                    }

                    QRCodeData qrCodeData = qrGenerator.CreateQrCode(inputText, QRCodeGenerator.ECCLevel.Q);

                    using (PngByteQRCode imageByte = new(qrCodeData))
                    {
                        byte[] qrCodeBytes = imageByte.GetGraphic(50);
                        return Convert.ToBase64String(qrCodeBytes);
                    }
                }
            }
            catch (Exception ex)
            {
                return $"Error: {ex.Message}";
            }
        }

    }
}
