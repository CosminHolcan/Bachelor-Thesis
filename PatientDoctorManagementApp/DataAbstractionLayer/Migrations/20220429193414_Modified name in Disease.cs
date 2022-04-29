using Microsoft.EntityFrameworkCore.Migrations;

namespace DataAbstractionLayer.Migrations
{
    public partial class ModifiednameinDisease : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Descripttion",
                table: "Diseases",
                newName: "Description");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Description",
                table: "Diseases",
                newName: "Descripttion");
        }
    }
}
