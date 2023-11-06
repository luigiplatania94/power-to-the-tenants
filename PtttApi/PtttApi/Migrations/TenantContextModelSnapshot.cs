﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using PtttApi.Db;

#nullable disable

namespace PtttApi.Migrations
{
    [DbContext(typeof(TenantContext))]
    partial class TenantContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.13")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("AttributeEntityRoomieEntity", b =>
                {
                    b.Property<Guid>("AttributesId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("RoomieEntityId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("AttributesId", "RoomieEntityId");

                    b.HasIndex("RoomieEntityId");

                    b.ToTable("AttributeEntityRoomieEntity");
                });

            modelBuilder.Entity("PtttApi.Db.Entities.AttributeEntity", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("AttributeName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("AttributeEntity");
                });

            modelBuilder.Entity("PtttApi.Db.Entities.RoomieEntity", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ProfileImage")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Roomies");
                });

            modelBuilder.Entity("AttributeEntityRoomieEntity", b =>
                {
                    b.HasOne("PtttApi.Db.Entities.AttributeEntity", null)
                        .WithMany()
                        .HasForeignKey("AttributesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("PtttApi.Db.Entities.RoomieEntity", null)
                        .WithMany()
                        .HasForeignKey("RoomieEntityId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
