
package cdn.common;

import java.util.regex.Pattern;

/**
 *
 * @author Shakir
 */
public class AppUtilities
{
	private static final String VERSION_REGEX = "^(\\d+\\.)(\\d+\\.)(\\*|\\d+)$";

	public static boolean isValidVersioning(String version)
	{
		Pattern pattern = Pattern.compile(VERSION_REGEX);
		return pattern.matcher(version).matches();
	}
}
