using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PtttApi.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Roomies",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ProfileImage = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roomies", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Traits",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TraitName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Traits", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RoomieEntityTraitEntity",
                columns: table => new
                {
                    RoomiesId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TraitsId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RoomieEntityTraitEntity", x => new { x.RoomiesId, x.TraitsId });
                    table.ForeignKey(
                        name: "FK_RoomieEntityTraitEntity_Roomies_RoomiesId",
                        column: x => x.RoomiesId,
                        principalTable: "Roomies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RoomieEntityTraitEntity_Traits_TraitsId",
                        column: x => x.TraitsId,
                        principalTable: "Traits",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RoomieEntityTraitEntity_TraitsId",
                table: "RoomieEntityTraitEntity",
                column: "TraitsId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RoomieEntityTraitEntity");

            migrationBuilder.DropTable(
                name: "Roomies");

            migrationBuilder.DropTable(
                name: "Traits");
        }
    }
}
