using PtttApi.Domain;
namespace PtttApi.Services;

public interface IRoomieService
{
    Roomie? GetRoomieById(Guid id);
}