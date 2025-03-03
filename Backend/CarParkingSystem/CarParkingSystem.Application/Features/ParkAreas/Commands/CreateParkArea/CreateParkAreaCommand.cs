using AutoMapper;
using MediatR;
using System.Threading.Tasks;
using System.Threading;
using CarParkingSystem.Core.Enums;
using CarParkingSystem.Core.Wrappers;
using CarParkingSystem.Core.Interfaces.Repositories;
using CarParkingSystem.Core.Entities;
using CarParkingSystem.Core.Interfaces;

namespace CarParkingSystem.Core.Features.ParkAreas.Commands.CreateParkArea
{
    public class CreateParkAreaCommand : IRequest<Response<int>>
    {
        public string Location { get; set; }

        public class CreateParkAreaCommandHandler : IRequestHandler<CreateParkAreaCommand, Response<int>>
        {
            private readonly IParkAreaRepositoryAsync parkAreaRepository;
            private readonly IQRCodeService qRCodeService;
            private readonly IMapper _mapper;

            public CreateParkAreaCommandHandler(IParkAreaRepositoryAsync parkAreaRepository, IQRCodeService qRCodeService, IMapper mapper)
            {
                this.parkAreaRepository = parkAreaRepository;
                this.qRCodeService = qRCodeService;
                _mapper = mapper;
            }

            public async Task<Response<int>> Handle(CreateParkAreaCommand request, CancellationToken cancellationToken)
            {
                var qrCodeBase64 = await this.qRCodeService.GenerateQRCodeBase64(request.Location);

                var parkArea = new ParkArea
                {
                    Location = request.Location,
                    QrCode = qrCodeBase64,
                    Status = ParkAreaStatus.Empty,
                };

                await this.parkAreaRepository.AddAsync(parkArea);
                return new Response<int>(parkArea.Id);
            }

        }
    }
}
