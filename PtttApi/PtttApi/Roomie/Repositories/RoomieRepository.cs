using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using PtttApi.Db;
using PtttApi.Db.Entities;
using PtttApi.Domain;

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

    public void CreateRoomie(CreateRoomieModel roomie)
    {
        //roomies.Add(roomie);
    }

    public async Task DeleteRoomie(Guid id)
    {
        var roomieToDelete = await GetRoomieById(id);

        if (roomieToDelete != null)
        {
            _tenantContext.Roomies.Remove(roomieToDelete);
            await _tenantContext.SaveChangesAsync();
        }
    }

}