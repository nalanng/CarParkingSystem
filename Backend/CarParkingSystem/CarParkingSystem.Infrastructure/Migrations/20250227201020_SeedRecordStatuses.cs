using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CarParkingSystem.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class SeedRecordStatuses : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "RecordStatuses",
                columns: new[] { "StatusName" },
                values: new object[] { "Active" });

            migrationBuilder.InsertData(
                table: "RecordStatuses",
                columns: new[] { "StatusName" },
                values: new object[] { "Complete" });

            migrationBuilder.InsertData(
                table: "RecordStatuses",
                columns: new[] { "StatusName" },
                values: new object[] { "Pending payment" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "RecordStatuses",
                keyColumn: "StatusName",
                keyValues: new object[] { "Active", "Complete", "Pending payment" });
        }

    }
}
