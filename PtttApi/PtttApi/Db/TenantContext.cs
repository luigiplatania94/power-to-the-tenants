using Microsoft.EntityFrameworkCore;
using PtttApi.Db.Entities;

namespace PtttApi.Db;

public class TenantContext : DbContext
{
    public DbSet<RoomieEntity> Roomies { get; set; }

    public TenantContext( DbContextOptions options) : base(options)
    {
        
    }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<RoomieEntity>()
            .HasMany(r => r.Attributes); // No navigation property on AttributeEntity
    }
}