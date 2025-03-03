
using CarParkingSystem.Core.Exceptions;
using CarParkingSystem.Core.Interfaces.Repositories;
using CarParkingSystem.Core.Wrappers;
using MediatR;
using System.Threading.Tasks;
using System.Threading;

namespace CarParkingSystem.Core.Features.ParkRecords.Commands.UpdateParkRecord
{
    public class UpdateParkRecordCommand : IRequest<Response<int>>
    {
        public int Id { get; set; }
        public int StatusId { get; set; }
        public class UpdateParkRecordCommandHandler : IRequestHandler<UpdateParkRecordCommand, Response<int>>
        {
            private readonly IParkRecordRepositoryAsync parkRecordRepository;

            public UpdateParkRecordCommandHandler(IParkRecordRepositoryAsync parkRecordRepository)
            {
                this.parkRecordRepository = parkRecordRepository;
            }

            public async Task<Response<int>> Handle(UpdateParkRecordCommand command, CancellationToken cancellationToken)
            {
                var parkRecord = await this.parkRecordRepository.GetByIdAsync(command.Id);
                if (parkRecord == null) throw new EntityNotFoundException("park record", command.Id);

                parkRecord.StatusId = command.StatusId;

                await parkRecordRepository.UpdateAsync(parkRecord);
                return new Response<int>(parkRecord.Id);
            }
        }

    }
}
