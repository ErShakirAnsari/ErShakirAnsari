
<#if package?? && package != "">
package ${package};
</#if>

/**
 *
 * @author SKR
 */
public class ${name} extends Exception {


   /**
    * Creates a new instance of <code>${name}</code> without detail message.
    */
   public ${name}() {
   }

   /**
    * Constructs an instance of <code>${name}</code> with the specified detail message.
    * @param msg the detail message.
    */
   public ${name}(String msg) {
      super(msg);
   }
}