
using CarParkingSystem.Core.Interfaces.Repositories;
using FluentValidation;

namespace CarParkingSystem.Core.Features.ParkRecords.Commands.CreateParkRecord
{
    public class CreateParkRecordsCommandValidator : AbstractValidator<CreateParkRecordCommand>
    {
        private readonly IParkRecordRepositoryAsync parkRecordRepository;

        public CreateParkRecordsCommandValidator(IParkRecordRepositoryAsync parkRecordRepository)
        {
            this.parkRecordRepository = parkRecordRepository;

            RuleFor(pr => pr.LotId)
                .NotEmpty().WithMessage("Lot is required.");

        }
    }
}
