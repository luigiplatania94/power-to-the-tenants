using PtttApi.Domain;
namespace PtttApi.Services;

public interface IRoomieService
{
    Roomie? GetRoomieById(Guid id);
    Roomie CreateRoomie(CreateRoomieModel model);
    void DeleteRoomie(Guid id);
    Roomie UpdateRoomie(Roomie existingRoomie, UpdateRoomieModel model);
}