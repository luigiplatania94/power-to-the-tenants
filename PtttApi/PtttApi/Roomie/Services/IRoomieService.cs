using PtttApi.Domain;
namespace PtttApi.Services;

public interface IRoomieService
{
    Task<Roomie> GetRoomieById(Guid id);
    Task<List<Roomie>> GetAllRoomies();
    void CreateRoomie(CreateRoomieModel model);
    Task DeleteRoomie(Guid id);
    Roomie UpdateRoomie(Roomie existingRoomie, UpdateRoomieModel model);
}