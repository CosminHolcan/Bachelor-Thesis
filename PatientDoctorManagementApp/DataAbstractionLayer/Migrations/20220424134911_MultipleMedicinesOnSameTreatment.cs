using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DataAbstractionLayer.Migrations
{
    public partial class MultipleMedicinesOnSameTreatment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Treatments_Medicines_MedicineId",
                table: "Treatments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Treatments",
                table: "Treatments");

            migrationBuilder.DropIndex(
                name: "IX_Treatments_MedicineId",
                table: "Treatments");

            migrationBuilder.DropColumn(
                name: "MedicineId",
                table: "Treatments");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Treatments",
                table: "Treatments",
                columns: new[] { "PatientId", "DiseaseId", "DoctorId", "StartingDate" });

            migrationBuilder.CreateTable(
                name: "MedicineTreatment",
                columns: table => new
                {
                    MedicinesId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TreatmentsPatientId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TreatmentsDiseaseId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TreatmentsDoctorId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TreatmentsStartingDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MedicineTreatment", x => new { x.MedicinesId, x.TreatmentsPatientId, x.TreatmentsDiseaseId, x.TreatmentsDoctorId, x.TreatmentsStartingDate });
                    table.ForeignKey(
                        name: "FK_MedicineTreatment_Medicines_MedicinesId",
                        column: x => x.MedicinesId,
                        principalTable: "Medicines",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MedicineTreatment_Treatments_TreatmentsPatientId_TreatmentsDiseaseId_TreatmentsDoctorId_TreatmentsStartingDate",
                        columns: x => new { x.TreatmentsPatientId, x.TreatmentsDiseaseId, x.TreatmentsDoctorId, x.TreatmentsStartingDate },
                        principalTable: "Treatments",
                        principalColumns: new[] { "PatientId", "DiseaseId", "DoctorId", "StartingDate" },
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_MedicineTreatment_TreatmentsPatientId_TreatmentsDiseaseId_TreatmentsDoctorId_TreatmentsStartingDate",
                table: "MedicineTreatment",
                columns: new[] { "TreatmentsPatientId", "TreatmentsDiseaseId", "TreatmentsDoctorId", "TreatmentsStartingDate" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MedicineTreatment");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Treatments",
                table: "Treatments");

            migrationBuilder.AddColumn<Guid>(
                name: "MedicineId",
                table: "Treatments",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddPrimaryKey(
                name: "PK_Treatments",
                table: "Treatments",
                columns: new[] { "PatientId", "DiseaseId", "DoctorId", "MedicineId" });

            migrationBuilder.CreateIndex(
                name: "IX_Treatments_MedicineId",
                table: "Treatments",
                column: "MedicineId");

            migrationBuilder.AddForeignKey(
                name: "FK_Treatments_Medicines_MedicineId",
                table: "Treatments",
                column: "MedicineId",
                principalTable: "Medicines",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
