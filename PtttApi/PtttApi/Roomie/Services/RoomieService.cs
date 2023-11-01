using PtttApi.Db.Entities;
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
        return new Roomie(roomieEntity);
    }
    
    public async Task<List<Roomie>> GetAllRoomies()
    {
        var roomieEntities = await _roomieRepository.GetAllRoomies();
        return roomieEntities.Select(re => new Roomie(re)).ToList(); // Use .Select to project and convert to Roomie objects
    }
    
    public void CreateRoomie(CreateRoomieModel model)
    {
         _roomieRepository.CreateRoomie(model);
    }
    
    public async Task DeleteRoomie(Guid id)
    {
        await _roomieRepository.DeleteRoomie(id);
    }
    public Roomie UpdateRoomie(Roomie existingRoomie, UpdateRoomieModel model)
    {
        existingRoomie.ProfileImage = model.ProfileImage;
        existingRoomie.Description = model.Description;
        existingRoomie.Attributes = model.Attributes;
        
        return existingRoomie;
    }
}