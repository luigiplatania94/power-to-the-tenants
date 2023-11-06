using System.Runtime.Serialization;

namespace PtttApi.Exceptions;

public class RoomieNotFoundException : Exception
{
    public RoomieNotFoundException()
    {
    }

    protected RoomieNotFoundException(SerializationInfo info, StreamingContext context) : base(info, context)
    {
    }

    public RoomieNotFoundException(string? message) : base(message)
    {
    }

    public RoomieNotFoundException(string? message, Exception? innerException) : base(message, innerException)
    {
    }
}