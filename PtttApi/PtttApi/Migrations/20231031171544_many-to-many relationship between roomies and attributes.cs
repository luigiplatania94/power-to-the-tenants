using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PtttApi.Migrations
{
    /// <inheritdoc />
    public partial class manytomanyrelationshipbetweenroomiesandattributes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AttributeEntity_Roomies_RoomieEntityId",
                table: "AttributeEntity");

            migrationBuilder.DropIndex(
                name: "IX_AttributeEntity_RoomieEntityId",
                table: "AttributeEntity");

            migrationBuilder.DropColumn(
                name: "RoomieEntityId",
                table: "AttributeEntity");

            migrationBuilder.CreateTable(
                name: "AttributeEntityRoomieEntity",
                columns: table => new
                {
                    AttributesId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    RoomieEntityId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AttributeEntityRoomieEntity", x => new { x.AttributesId, x.RoomieEntityId });
                    table.ForeignKey(
                        name: "FK_AttributeEntityRoomieEntity_AttributeEntity_AttributesId",
                        column: x => x.AttributesId,
                        principalTable: "AttributeEntity",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AttributeEntityRoomieEntity_Roomies_RoomieEntityId",
                        column: x => x.RoomieEntityId,
                        principalTable: "Roomies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AttributeEntityRoomieEntity_RoomieEntityId",
                table: "AttributeEntityRoomieEntity",
                column: "RoomieEntityId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AttributeEntityRoomieEntity");

            migrationBuilder.AddColumn<Guid>(
                name: "RoomieEntityId",
                table: "AttributeEntity",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AttributeEntity_RoomieEntityId",
                table: "AttributeEntity",
                column: "RoomieEntityId");

            migrationBuilder.AddForeignKey(
                name: "FK_AttributeEntity_Roomies_RoomieEntityId",
                table: "AttributeEntity",
                column: "RoomieEntityId",
                principalTable: "Roomies",
                principalColumn: "Id");
        }
    }
}
