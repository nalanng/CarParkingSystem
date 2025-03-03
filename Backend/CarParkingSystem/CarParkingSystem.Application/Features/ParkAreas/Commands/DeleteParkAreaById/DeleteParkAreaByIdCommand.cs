using CarParkingSystem.Core.Exceptions;
using CarParkingSystem.Core.Interfaces.Repositories;
using CarParkingSystem.Core.Wrappers;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace CarParkingSystem.Core.Features.ParkAreas.Commands.DeleteParkAreaById
{
    public class DeleteParkAreaByIdCommand : IRequest<Response<int>>
    {
        public int Id { get; set; }

        public class DeleteParkAreaByIdCommandHandler : IRequestHandler<DeleteParkAreaByIdCommand, Response<int>>
        {
            private readonly IParkAreaRepositoryAsync parkAreaRepository;

            public DeleteParkAreaByIdCommandHandler(IParkAreaRepositoryAsync parkAreaRepository)
            {
                this.parkAreaRepository = parkAreaRepository;
            }

            public async Task<Response<int>> Handle(DeleteParkAreaByIdCommand command, CancellationToken cancellationToken)
            {
                var parkArea = await this.parkAreaRepository.GetByIdAsync(command.Id);
                if (parkArea == null) throw new ApiException($"Park area Not Found.");
                if (parkArea.Status == Enums.ParkAreaStatus.Full) throw new ApiException($"Park area cannot be deleted while it is full.");

                await this.parkAreaRepository.DeleteAsync(parkArea);

                return new Response<int>(parkArea.Id);
            }
        }
    }
}
