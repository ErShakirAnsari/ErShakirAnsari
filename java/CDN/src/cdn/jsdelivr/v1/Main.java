
package cdn.jsdelivr.v1;

import java.io.IOException;

/**
 *
 * @author Shakir
 */
public class Main
{

	public static void main(String[] args) throws IOException
	{
		String version = Helpers.getVersion();
		if (version == null)
		{
			return;
		}

		Helpers.readChangeLogs();

		System.out.println("Done");
	}
}
