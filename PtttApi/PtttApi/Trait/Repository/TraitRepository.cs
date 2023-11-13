using Microsoft.EntityFrameworkCore;
using PtttApi.Db;
using PtttApi.Db.Entities;
using PtttApi.Domain;

namespace PtttApi.Trait.Repository;

public class TraitRepository : ITraitRepository
{
    private readonly TenantContext _tenantContext;

    public TraitRepository(TenantContext tenantContext)
    {
        _tenantContext = tenantContext;
    }


    public async Task<List<TraitEntity>> GetAllTraits()
        => await _tenantContext.Traits
            .ToListAsync();
}