/**
* Method used to encrypt a string into a SHA-256 hash.
*/

public string SHA256Encrypt(string value)
{
    var crypt = new SHA256Managed();
    string hash = string.Empty;
    byte[] crypto = crypt.ComputeHash(Encoding.UTF8.GetBytes(valor), 0, Encoding.UTF8.GetByteCount(valor));

    foreach (byte theByte in crypto)
    {
        hash += theByte.ToString("x2");
    }

    return hash;
}