using Microsoft.EntityFrameworkCore;
using PtttApi.Db;
using PtttApi.Db.Entities;
using PtttApi.Exceptions;
using PtttApi.Repositories;

namespace PtttApi.Trait.Repository;

public class TraitListRepository : ITraitListRepository
{
    
    private readonly TenantContext _tenantContext;
    private readonly IRoomieRepository _roomieRepository;

    public TraitListRepository(TenantContext tenantContext, IRoomieRepository roomieRepository)
    {
        _tenantContext = tenantContext;
        _roomieRepository = roomieRepository;
    }

    
    public async Task<RoomieEntity> UpdateRoomieTraits(List<Domain.Trait> traits, Guid roomieId)
    {
        var roomieToUpdate = await _roomieRepository.GetRoomieById(roomieId);
        
        if (roomieToUpdate == null) throw new RoomieNotFoundException();

        roomieToUpdate.Traits = traits.Select(trait => new TraitEntity(trait)).ToList(); 
        
        await _tenantContext.SaveChangesAsync();

        return roomieToUpdate;
    }
}