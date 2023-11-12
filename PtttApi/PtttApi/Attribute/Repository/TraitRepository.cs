using Microsoft.EntityFrameworkCore;
using PtttApi.Db;
using PtttApi.Db.Entities;
using PtttApi.Domain;

namespace PtttApi.Attribute.Repository;

public class TraitRepository : ITraitRepository
{
    private readonly TenantContext _tenantContext;

    public TraitRepository(TenantContext tenantContext)
    {
        _tenantContext = tenantContext;
    }


    public async Task<List<TraitEntity>> GetAllAttribute()
        => await _tenantContext.Traits
            .ToListAsync();
}