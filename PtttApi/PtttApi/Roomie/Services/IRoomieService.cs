using PtttApi.Domain;
namespace PtttApi.Services;

public interface IRoomieService
{
    Roomie? GetRoomieById(Guid id);
    Task<List<Roomie>> GetAllRoomies();
    void CreateRoomie(CreateRoomieModel model);
    void DeleteRoomie(Guid id);
    Roomie UpdateRoomie(Roomie existingRoomie, UpdateRoomieModel model);
}