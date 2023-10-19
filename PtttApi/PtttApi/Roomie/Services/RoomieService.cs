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


    public Roomie? GetRoomieById(Guid id)
    {
        return _roomieRepository.GetRoomieById(id);
    }
    
    public Roomie CreateRoomie(CreateRoomieModel model)
    {
        // Business logic for creating a new Roomie instance
        var newRoomie = new Roomie
        {
            Id = Guid.NewGuid(),  // Generate a new unique ID
            ProfileImage = model.ProfileImage,
            Description = model.Description,
            Attributes = model.Attributes
        };
    
        // Save the new Roomie to the repository
        _roomieRepository.CreateRoomie(newRoomie);

        return newRoomie;
    }
    
    public void DeleteRoomie(Guid id)
    {
        _roomieRepository.DeleteRoomie(id);
    }
}