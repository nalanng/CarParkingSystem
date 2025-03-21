using AutoMapper;
using CarParkingSystem.Core.Entities;
using CarParkingSystem.Core.Enums;
using CarParkingSystem.Core.Interfaces;
using CarParkingSystem.Core.Interfaces.Repositories;
using CarParkingSystem.Core.Wrappers;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace CarParkingSystem.Core.Features.ParkRecords.Commands.CreateParkRecord
{
    public class CreateParkRecordCommand : IRequest<Response<int>>
    {
        public int LotId { get; set; }
        public string UserId { get; set; }

        public class CreateParkAreaCommandHandler : IRequestHandler<CreateParkRecordCommand, Response<int>>
        {
            private readonly IParkRecordRepositoryAsync parkRecordRepository;
            private readonly IParkAreaRepositoryAsync parkAreaRepository;
            private readonly IDateTimeService dateTimeService;
            private readonly IMapper mapper;

            public CreateParkAreaCommandHandler(
                IParkRecordRepositoryAsync parkRecordRepository,
                IParkAreaRepositoryAsync parkAreaRepository,
                IDateTimeService dateTimeService,
                IMapper mapper)
            {
                this.parkRecordRepository = parkRecordRepository;
                this.parkAreaRepository = parkAreaRepository;
                this.dateTimeService = dateTimeService;
                this.mapper = mapper;
            }

            public async Task<Response<int>> Handle(CreateParkRecordCommand request, CancellationToken cancellationToken)
            {
                var parkRecord = new ParkRecord
                {
                    UserId = request.UserId,
                    LotId = request.LotId,
                    StartTime = this.dateTimeService.NowUtc,
                    Fee = 50,
                    StatusId = (int)ParkRecordStatus.Active
                };

                try
                {
                    await this.parkRecordRepository.AddAsync(parkRecord);
                    await this.parkAreaRepository.UpdateParkAreaStatus(request.LotId, ParkAreaStatus.Full);
                    return new Response<int>(parkRecord.Id);
                }
                catch (Exception ex)
                {
                    return new Response<int>($"Error: {ex.Message}");
                }
            }
        }

    }
}
