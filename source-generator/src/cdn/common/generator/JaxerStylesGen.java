
package cdn.common.generator;

/**
 *
 * @author SKR
 */
public class JaxerStylesGen
{
    public static void main(String[] args)
    {
        System.out.println(getWidthStyles());
    }

    private static String getWidthStyles()
    {
        String response = "";
        for (int i = 1; i <= 100; i++)
        {
            response += "*.min-width-" + i + " { min-width : " + i + "% !important }" + System.lineSeparator();
        }
        return response;
    }
}
