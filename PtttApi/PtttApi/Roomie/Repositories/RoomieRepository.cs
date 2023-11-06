using Microsoft.EntityFrameworkCore;
using PtttApi.Db;
using PtttApi.Db.Entities;
using PtttApi.Domain;
using PtttApi.Exceptions;

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
            .Where(r => r.Id == id) 
            .FirstOrDefaultAsync(); 
    
    public async Task<List<RoomieEntity>> GetAllRoomies() 
        => await _tenantContext.Roomies
            .ToListAsync();

    public async Task<RoomieEntity> CreateRoomie(CreateRoomieDTO roomie)
    {
        var newRoomie = new RoomieEntity
        {
            ProfileImage = roomie.ProfileImage,
            Description = roomie.Description,

            Attributes = roomie.Attributes.Select(attr => new AttributeEntity(attr.Id, attr.Name)).ToList()
        };
        
        _tenantContext.Roomies.Add(newRoomie);
        
        await _tenantContext.SaveChangesAsync();

        return newRoomie;
    }


    public async Task<RoomieEntity> UpdateRoomie(Guid id, UpdateRoomieDTO dto)
    {
        var roomieToUpdate = await GetRoomieById(id);

        if (roomieToUpdate == null) throw new RoomieNotFoundException();

        roomieToUpdate.ProfileImage = dto.ProfileImage;
        roomieToUpdate.Description = dto.Description;
        
        roomieToUpdate.Attributes =  dto.Attributes.Select(at => new AttributeEntity(at)).ToList(); 
        
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