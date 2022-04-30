using Microsoft.EntityFrameworkCore.Migrations;

namespace DataAbstractionLayer.Migrations
{
    public partial class Modifieddoctorspecializationfield : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Doctors_Specializations_specializationId",
                table: "Doctors");

            migrationBuilder.RenameColumn(
                name: "specializationId",
                table: "Doctors",
                newName: "SpecializationId");

            migrationBuilder.RenameIndex(
                name: "IX_Doctors_specializationId",
                table: "Doctors",
                newName: "IX_Doctors_SpecializationId");

            migrationBuilder.AddForeignKey(
                name: "FK_Doctors_Specializations_SpecializationId",
                table: "Doctors",
                column: "SpecializationId",
                principalTable: "Specializations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Doctors_Specializations_SpecializationId",
                table: "Doctors");

            migrationBuilder.RenameColumn(
                name: "SpecializationId",
                table: "Doctors",
                newName: "specializationId");

            migrationBuilder.RenameIndex(
                name: "IX_Doctors_SpecializationId",
                table: "Doctors",
                newName: "IX_Doctors_specializationId");

            migrationBuilder.AddForeignKey(
                name: "FK_Doctors_Specializations_specializationId",
                table: "Doctors",
                column: "specializationId",
                principalTable: "Specializations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
