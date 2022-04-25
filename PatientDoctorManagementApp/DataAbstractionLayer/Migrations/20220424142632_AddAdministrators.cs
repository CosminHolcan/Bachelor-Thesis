using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DataAbstractionLayer.Migrations
{
    public partial class AddAdministrators : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "AdministratorId",
                table: "Treatments",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Administrators",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserType = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Administrators", x => x.Id);
                });

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Treatments_Administrators_AdministratorId",
                table: "Treatments");

            migrationBuilder.DropTable(
                name: "Administrators");

            migrationBuilder.DropIndex(
                name: "IX_Treatments_AdministratorId",
                table: "Treatments");

            migrationBuilder.DropColumn(
                name: "AdministratorId",
                table: "Treatments");
        }
    }
}
