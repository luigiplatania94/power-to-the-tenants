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
    
    //DeleteAndThenCheckCount
    
    //DeleteRoomieById
    //GetsCountOfRoomie
}