
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

		//Helpers.readChangeLogs();

		String fileList = "[" + System.lineSeparator() + Helpers.getFileLists() + System.lineSeparator() + "]";

		System.out.println("Done");
	}
}
