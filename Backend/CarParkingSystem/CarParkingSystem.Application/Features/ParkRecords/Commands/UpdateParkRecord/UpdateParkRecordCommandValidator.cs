using CarParkingSystem.Core.Features.ParkRecords.Commands.CreateParkRecord;
using CarParkingSystem.Core.Interfaces.Repositories;
using FluentValidation;

namespace CarParkingSystem.Core.Features.ParkRecords.Commands.UpdateParkRecord
{
    class UpdateParkRecordCommandValidator : AbstractValidator<CreateParkRecordCommand>
    {
        private readonly IParkRecordRepositoryAsync parkRecordRepository;

        public UpdateParkRecordCommandValidator(IParkRecordRepositoryAsync parkRecordRepository)
        {
            this.parkRecordRepository = parkRecordRepository;

            RuleFor(pr => pr.LotId)
                .NotEmpty().WithMessage("Lot is required.");
        }
    }
}
