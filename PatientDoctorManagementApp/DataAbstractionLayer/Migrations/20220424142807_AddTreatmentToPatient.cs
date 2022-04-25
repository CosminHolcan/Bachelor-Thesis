using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DataAbstractionLayer.Migrations
{
    public partial class AddTreatmentToPatient : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Treatments_Administrators_AdministratorId",
                table: "Treatments");

            migrationBuilder.DropIndex(
                name: "IX_Treatments_AdministratorId",
                table: "Treatments");

            migrationBuilder.DropColumn(
                name: "AdministratorId",
                table: "Treatments");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "AdministratorId",
                table: "Treatments",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Treatments_AdministratorId",
                table: "Treatments",
                column: "AdministratorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Treatments_Administrators_AdministratorId",
                table: "Treatments",
                column: "AdministratorId",
                principalTable: "Administrators",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
