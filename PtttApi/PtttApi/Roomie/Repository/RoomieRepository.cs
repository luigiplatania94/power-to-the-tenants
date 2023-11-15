using Microsoft.EntityFrameworkCore;
using PtttApi.Db;
using PtttApi.Db.Entities;
using PtttApi.Domain;
using PtttApi.Exceptions;
using PtttApi.Trait.DTOs;

namespace PtttApi.Repositories;

public class RoomieRepository : IRoomieRepository
{
    private readonly TenantContext _tenantContext;
    public RoomieRepository(TenantContext tenantContext)
    {
        _tenantContext = tenantContext;
    }


    public async Task<RoomieEntity> GetRoomieById(Guid id)
        => await _tenantContext.Roomies
            .Include(r => r.Traits)
            .Where(r => r.Id == id) 
            .FirstOrDefaultAsync(); 
    
    public async Task<List<RoomieEntity>> GetAllRoomies() 
        => await _tenantContext.Roomies
            .Include(r => r.Traits)
            .ToListAsync();

    public async Task<RoomieEntity> CreateRoomie(CreateRoomieDTO roomie)
    {
        
        var newRoomie = new RoomieEntity
        {
            ProfileImage = roomie.ProfileImage,
            Description = roomie.Description,

            Traits = await GetTraitEntitiesFromNames(roomie.Traits),
        };
        
        _tenantContext.Roomies.Add(newRoomie);
        
        await _tenantContext.SaveChangesAsync();

        return newRoomie;
    }

    private async Task<List<TraitEntity>> GetTraitEntitiesFromNames(List<string> names)
    {
        var traitEntities = new List<TraitEntity>();
        foreach (var updateTrait in names)
        {
            var traitEntity = await _tenantContext.Traits.FirstOrDefaultAsync(t => t.TraitName == updateTrait);
            traitEntities.Add(traitEntity);
        }

        return traitEntities;
    }


    public async Task<RoomieEntity> UpdateRoomie(Guid id, UpdateRoomieDTO dto)
    {
        var roomieToUpdate = await GetRoomieById(id);

        if (roomieToUpdate == null) throw new RoomieNotFoundException();

        roomieToUpdate.ProfileImage = dto.ProfileImage;
        roomieToUpdate.Description = dto.Description;
        
        await _tenantContext.SaveChangesAsync();
        
        return roomieToUpdate;
    }

    
    public async Task DeleteRoomie(Guid id)
    {
        var roomieToDelete = await GetRoomieById(id);

        if (roomieToDelete == null) throw new RoomieNotFoundException();
        
        _tenantContext.Roomies.Remove(roomieToDelete);
        await _tenantContext.SaveChangesAsync();
    }
}