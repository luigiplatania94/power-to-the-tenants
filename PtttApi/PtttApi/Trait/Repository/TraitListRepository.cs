using Microsoft.EntityFrameworkCore;
using PtttApi.Db;
using PtttApi.Db.Entities;
using PtttApi.Exceptions;
using PtttApi.Repositories;
using PtttApi.Trait.DTOs;

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


    public async Task<RoomieEntity> UpdateRoomieTraits(List<string> traitNames, Guid roomieId)
    {
        var roomieToUpdate = await _roomieRepository.GetRoomieById(roomieId);

        if (roomieToUpdate == null) throw new RoomieNotFoundException();

        roomieToUpdate.Traits.Clear();
        
        foreach (var updateTrait in traitNames)
        {
            var traitEntity = await _tenantContext.Traits.FirstOrDefaultAsync(t => t.TraitName == updateTrait);
            
            roomieToUpdate.Traits.Add(traitEntity);
        }

        // Step 4: Save changes to the database
        await _tenantContext.SaveChangesAsync();

        return roomieToUpdate;
    }
}