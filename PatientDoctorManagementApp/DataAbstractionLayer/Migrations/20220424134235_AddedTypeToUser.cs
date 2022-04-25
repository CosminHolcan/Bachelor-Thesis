using Microsoft.EntityFrameworkCore.Migrations;

namespace DataAbstractionLayer.Migrations
{
    public partial class AddedTypeToUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserType",
                table: "Patients",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "UserType",
                table: "Doctors",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserType",
                table: "Patients");

            migrationBuilder.DropColumn(
                name: "UserType",
                table: "Doctors");
        }
    }
}
