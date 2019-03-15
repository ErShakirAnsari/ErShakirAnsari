
package cdn;

import cdn.utils.Constants;
import cdn.utils.AppUtilities;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.Writer;
import java.text.MessageFormat;
import java.util.ArrayList;

/**
 *
 * @author Shakir Ansari
 */
public class CdnMain
{
    public static void main(String[] args) throws Exception
    {
        ArrayList<String> fileNames = new ArrayList<>();
        try (Writer writer = new BufferedWriter(new FileWriter(Constants.indexFile));)
        {
            writer.append(AppUtilities.getLogo());
            writer.append(AppUtilities.getHead(1));

            for (Object obj : AppUtilities.getChildFolderOfCdnFolders())
            {
                String folderName = obj.toString();
                writer.append(getCardDivStart(getFileNameWithoutPath(folderName)));

                String prevFileName = null;
                ArrayList<String> list = AppUtilities.getChildFileList(folderName);
                int listSize = list.size();
                for (int i = 0; i < listSize; i++)
                {
                    String innerFile = list.get(i);
                    if (prevFileName == null || !isSameFile(prevFileName, innerFile))
                    {
                        writer.append("<h5 class='bg-light p-2'>" + getFileNameWithoutVersion(getFileNameWithoutPath(innerFile)) + "</h5>");
                    }

                    fileNames.add(innerFile.substring(innerFile.lastIndexOf(File.separator) + 1));
                    writer.append(getCardContent(new File(innerFile)));

//                    if (i + 1 < listSize)
//                    {
//                        String nextFileName = getFileNameWithoutPath(list.get(i + 1));
//                        if (!isSameFileButDifferentVersion(innerFile, nextFileName) && diffFile)
//                        {
//                            writer.append("<hr class='m-2'>");
//                        }
//                    }

                    prevFileName = innerFile;

                }
                writer.append("<br>");

                writer.append(getCardDivEnd());
            }

            writer.append(AppUtilities.getAbout(1));
            writer.append("\n\n<!--[");
            for (int i = 0; i < fileNames.size(); i++)
            {
                writer.append("'" + fileNames.get(i) + "'");
                if (i != fileNames.size())
                {
                    writer.append(",");
                }
            }
            writer.append("];-->\n\n");
            writer.append(AppUtilities.getBodyEnd(1));
            System.out.println("****************** DONE ******************");
            System.out.println(Constants.indexFile);
        }
    }

    private static boolean isSameFile(String prevFile, String currentFile)
    {
        // Remove path only filename like abc-v1.10.js
        String tempPrevFile = prevFile.substring(prevFile.lastIndexOf(File.separator) + 1);
        String tempCurrentFile = currentFile.substring(currentFile.lastIndexOf(File.separator) + 1);

        return getFileNameWithoutVersion(tempPrevFile).equalsIgnoreCase(getFileNameWithoutVersion(tempCurrentFile));
    }

    private static boolean isSameFileButDifferentVersion(String prevFile, String currentFile)
    {
        if (prevFile == null || currentFile == null | prevFile.isEmpty() || currentFile.isEmpty())
        {
            return false;
        }
        // Remove path only filename like abc-v1.10.js
        String tempPrevFile = prevFile.substring(prevFile.lastIndexOf(File.separator) + 1);
        tempPrevFile = tempPrevFile.toLowerCase().replace(".min", "");

        String tempCurrentFile = currentFile.substring(currentFile.lastIndexOf(File.separator) + 1);
        tempCurrentFile = tempCurrentFile.toLowerCase().replace(".min", "");

        return getFileNameWithoutExtension(tempPrevFile).equalsIgnoreCase(getFileNameWithoutExtension(tempCurrentFile));
    }

    private static String getFileNameWithoutVersion(String filename)
    {
        if (filename == null || !filename.contains("-v"))
        {
            return filename;
        }
        return filename.substring(0, filename.lastIndexOf("-v"));
    }

    private static String getFileNameWithoutPath(String filename)
    {
        if (filename == null || !filename.contains(File.separator))
        {
            return filename;
        }
        return filename.substring(filename.lastIndexOf(File.separator) + 1);
    }

    private static String getFileNameWithoutExtension(String filename)
    {
        if (filename == null || !filename.contains("."))
        {
            return filename;
        }
        return filename.substring(0, filename.lastIndexOf("."));
    }

    private static String getCardDivStart(String folderName)
    {
        return ""
                + "<div class='card mb-2'>"
                + "<div class='card-header'><b>" + folderName + "</b></div>"
                + "<div class='card-body' style='display: none'>";

    }

    private static String getCardDivEnd()
    {
        return "</div></div>";
    }

    private static String getCardContent(File file)
    {
        return ""
                + "<label class='px-2'>"
                + "<i class='fa fa-copy'></i> "
                + "<i class='fa fa-clipboard'></i>"
                + "<a href='#'><i class='fa fa-link'></i></a>"
                + " | "
                + "<code>"
                + file.getAbsolutePath().replace(Constants.cdnRootFolder, "").replace("\\", "/")
                + "</code>"
                + " (size: " + AppUtilities.getFileSize(file.length()) + ")"
                + "</label>";
    }

    private static String getCardDiv(File folder)
    {
        StringBuilder builder = new StringBuilder();

        String folderName = folder.getName().toLowerCase();
        folderName = folderName.startsWith("1") ? folderName.replace("1", "") : folderName;

        builder.append("<div class='card mb-2'>");
        builder.append("<div class='card-header'> ").append(folderName).append(" </div>");
        builder.append("<div class='card-body' style='display: none'>");

        for (File singleFile : folder.listFiles())
        {
            if (singleFile.isFile())
            {
                //builder.append(System.lineSeparator());
                builder.append("<label>");
                builder.append("<i class='fa fa-copy'></i>&nbsp;");
                builder.append("<i class='fa fa-clipboard'></i>&nbsp;");
                builder.append("<a href='#'><i class='fa fa-link'></i></a>");
                builder.append("&nbsp;|&nbsp;");
                builder.append("<code>");
                //builder.append("<a href='#'>");
                builder.append(singleFile.getAbsolutePath().replace(Constants.cdnRootFolder, "").replace("\\", "/"));
                //builder.append("</a>");
                builder.append("</code>");
                builder.append(MessageFormat.format("&nbsp;(size: {0})", AppUtilities.getFileSize(singleFile.length())));
                builder.append("</label>");
                //builder.append(System.lineSeparator());
                //System.out.println(singleFile.getAbsolutePath());
            }
        }

        builder.append("</div>");
        builder.append("</div>");

        return builder.toString();
    }

}
