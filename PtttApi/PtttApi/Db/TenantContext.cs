using Microsoft.EntityFrameworkCore;
using PtttApi.Db.Entities;

namespace PtttApi.Db;

public class TenantContext : DbContext
{
    public DbSet<RoomieEntity> Roomies { get; set; }
    public DbSet<TraitEntity> Traits { get; set; }
    

    public TenantContext( DbContextOptions options) : base(options)
    {
        
    }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<RoomieEntity>()
            .HasMany(r => r.Traits)
            .WithMany(attr => attr.Roomies);
        
    }
}