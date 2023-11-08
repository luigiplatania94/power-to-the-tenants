using PtttApi.Domain;
using PtttApi.Repositories;

namespace PtttApi.Services;

public class RoomieService : IRoomieService
{
    private readonly IRoomieRepository _roomieRepository;
    public RoomieService(IRoomieRepository roomieRepository) // it will ask the DI container for something that fulfills the contract
    {
        _roomieRepository = roomieRepository;
    }


    public async Task<Roomie> GetRoomieById(Guid id)
    {
        var roomieEntity = await _roomieRepository.GetRoomieById(id);
        if (roomieEntity == null) return new Roomie(null);
        
        return new Roomie(roomieEntity);
    }
    
    public async Task<List<Roomie>> GetAllRoomies()
    {
        var roomieEntities = await _roomieRepository.GetAllRoomies();
        return roomieEntities.Select(re => new Roomie(re)).ToList();
    }
    
    
    public async Task<Roomie> CreateRoomie(CreateRoomieDTO dto)
    {
         var roomieEntity =  await _roomieRepository.CreateRoomie(dto);
         return new Roomie(roomieEntity);
    }
    
    public async Task DeleteRoomie(Guid id)
    {
        // TODO this should return a task?
        await _roomieRepository.DeleteRoomie(id);
    }
    
    public async Task<Roomie> UpdateRoomie(Guid id, UpdateRoomieDTO dto)
    {
        return new Roomie(await _roomieRepository.UpdateRoomie(id, dto));
    }
}